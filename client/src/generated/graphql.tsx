import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChatMessagesObjectType = {
  __typename?: 'ChatMessagesObjectType';
  chat?: Maybe<PrivateChat>;
  n_messages?: Maybe<Scalars['Int']>;
  n_participants?: Maybe<Scalars['Int']>;
};

export type CreateChatInputType = {
  friendId: Scalars['String'];
  uid: Scalars['String'];
};

export type CreateChatObjectType = {
  __typename?: 'CreateChatObjectType';
  chat?: Maybe<PrivateChat>;
  error?: Maybe<CreateContactError>;
};

export type CreateContactError = {
  __typename?: 'CreateContactError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  senderId: Scalars['String'];
  text: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createChat: CreateChatObjectType;
  invalidateToken: Scalars['Boolean'];
  login: UserObjectType;
  logout: Scalars['Boolean'];
  register: UserObjectType;
  sendMessage: SendMessageObjectType;
};


export type MutationCreateChatArgs = {
  input: CreateChatInputType;
};


export type MutationLoginArgs = {
  input: UserLoginInput;
};


export type MutationRegisterArgs = {
  input: UserRegisterInput;
};


export type MutationSendMessageArgs = {
  input: SendMessageInputType;
};

export type PrivateChat = {
  __typename?: 'PrivateChat';
  chatId: Scalars['String'];
  createdAt: Scalars['String'];
  messages: Array<Message>;
  updatedAt: Scalars['String'];
  users: Array<User>;
};

export type Query = {
  __typename?: 'Query';
  getChat: ChatMessagesObjectType;
  user: UserObjectType;
  users: Array<User>;
};


export type QueryGetChatArgs = {
  chatId: Scalars['String'];
};

export type SendMessageInputType = {
  chatId: Scalars['String'];
  message: Scalars['String'];
  senderId: Scalars['String'];
};

export type SendMessageObjectType = {
  __typename?: 'SendMessageObjectType';
  message?: Maybe<Message>;
  reason_or_message: Scalars['String'];
  sent?: Maybe<Scalars['Boolean']>;
};

export type User = {
  __typename?: 'User';
  chats?: Maybe<Array<PrivateChat>>;
  createdAt: Scalars['String'];
  gender: Scalars['String'];
  uid: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserLoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UserObjectType = {
  __typename?: 'UserObjectType';
  accessToken?: Maybe<Scalars['String']>;
  error?: Maybe<Error>;
  user?: Maybe<User>;
};

export type UserRegisterInput = {
  gender: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type CreateChatMutationVariables = Exact<{
  input: CreateChatInputType;
}>;


export type CreateChatMutation = { __typename?: 'Mutation', createChat: { __typename?: 'CreateChatObjectType', chat?: { __typename?: 'PrivateChat', chatId: string, users: Array<{ __typename?: 'User', username: string, uid: string }> } | null | undefined, error?: { __typename?: 'CreateContactError', field: string, message: string } | null | undefined } };

export type LoginMutationVariables = Exact<{
  input: UserLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserObjectType', accessToken?: string | null | undefined, user?: { __typename?: 'User', username: string, gender: string, uid: string } | null | undefined, error?: { __typename?: 'Error', message: string, field: string } | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  input: UserRegisterInput;
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserObjectType', accessToken?: string | null | undefined, user?: { __typename?: 'User', username: string, gender: string, uid: string } | null | undefined, error?: { __typename?: 'Error', message: string, field: string } | null | undefined } };

export type AppUserQueryVariables = Exact<{ [key: string]: never; }>;


export type AppUserQuery = { __typename?: 'Query', user: { __typename?: 'UserObjectType', user?: { __typename?: 'User', username: string, gender: string, uid: string, chats?: Array<{ __typename?: 'PrivateChat', chatId: string, updatedAt: string, users: Array<{ __typename?: 'User', username: string, uid: string }> }> | null | undefined } | null | undefined } };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', username: string, gender: string, createdAt: string, uid: string }> };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'UserObjectType', accessToken?: string | null | undefined, user?: { __typename?: 'User', username: string, gender: string, uid: string } | null | undefined, error?: { __typename?: 'Error', field: string, message: string } | null | undefined } };


export const CreateChatDocument = gql`
    mutation CreateChat($input: CreateChatInputType!) {
  createChat(input: $input) {
    chat {
      chatId
      users {
        username
        uid
      }
    }
    error {
      field
      message
    }
  }
}
    `;
export type CreateChatMutationFn = Apollo.MutationFunction<CreateChatMutation, CreateChatMutationVariables>;

/**
 * __useCreateChatMutation__
 *
 * To run a mutation, you first call `useCreateChatMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateChatMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createChatMutation, { data, loading, error }] = useCreateChatMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateChatMutation(baseOptions?: Apollo.MutationHookOptions<CreateChatMutation, CreateChatMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateChatMutation, CreateChatMutationVariables>(CreateChatDocument, options);
      }
export type CreateChatMutationHookResult = ReturnType<typeof useCreateChatMutation>;
export type CreateChatMutationResult = Apollo.MutationResult<CreateChatMutation>;
export type CreateChatMutationOptions = Apollo.BaseMutationOptions<CreateChatMutation, CreateChatMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: UserLoginInput!) {
  login(input: $input) {
    user {
      username
      gender
      uid
    }
    accessToken
    error {
      message
      field
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: UserRegisterInput!) {
  register(input: $input) {
    user {
      username
      gender
      uid
    }
    accessToken
    error {
      message
      field
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const AppUserDocument = gql`
    query AppUser {
  user {
    user {
      username
      gender
      uid
      chats {
        chatId
        updatedAt
        users {
          username
          uid
        }
      }
    }
  }
}
    `;

/**
 * __useAppUserQuery__
 *
 * To run a query within a React component, call `useAppUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useAppUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAppUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useAppUserQuery(baseOptions?: Apollo.QueryHookOptions<AppUserQuery, AppUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AppUserQuery, AppUserQueryVariables>(AppUserDocument, options);
      }
export function useAppUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AppUserQuery, AppUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AppUserQuery, AppUserQueryVariables>(AppUserDocument, options);
        }
export type AppUserQueryHookResult = ReturnType<typeof useAppUserQuery>;
export type AppUserLazyQueryHookResult = ReturnType<typeof useAppUserLazyQuery>;
export type AppUserQueryResult = Apollo.QueryResult<AppUserQuery, AppUserQueryVariables>;
export const AllUsersDocument = gql`
    query AllUsers {
  users {
    username
    gender
    createdAt
    uid
  }
}
    `;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const UserDocument = gql`
    query User {
  user {
    user {
      username
      gender
      uid
    }
    accessToken
    error {
      field
      message
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;