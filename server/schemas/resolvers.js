const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { Authentication } = require('apollo-server-express');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('savedBooks');
        },
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('savedBooks');


                return userData;
            }
        },
    },

    Mutation: {
        createUser: async (parent, args) => {
            const user = await User.create(args);

            return { user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Incorrect creditials');
            }

            const token = signToken(user);
            return { token, user };
        },
        addBook: async (parent, { user, body }, context) => {
            if (context.user) {
                const saveBook = await User.findOneAndUpdate(
                    { _id: user },
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                )
                return saveBook;
            }
            throw new AuthenticationError('Not signed in! Please sign in!');
        },
        deleteBook: async (parent, { user }, context) => {
            const deleteBook = await User.findOneAndUpdate(
                { _id: user.id },
                { $pull: { savedBooks: { bookId: context.bookId } } },
                { new: true }
            );
            if (!deleteBook) {
                throw new AuthenticationError('User not found!');
            }
            return deleteBook;
        }
    }

}