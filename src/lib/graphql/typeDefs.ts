export const typeDefs = `
  type Project {
    id: ID!
    name: String!
    type: String!
    status: String!
    progress: Float!
    completedSteps: [String!]!
    tokenConfig: TokenConfig
    tokenomics: Tokenomics
    contractAddress: String
    auditStatus: String
    securityScore: Float
    teamMembers: [String!]
    launchDate: String
  }

  type TokenConfig {
    name: String!
    symbol: String!
    initialSupply: String!
    features: TokenFeatures!
  }

  type TokenFeatures {
    mintable: Boolean!
    burnable: Boolean!
    pausable: Boolean!
    staking: Boolean!
    governance: Boolean!
    deflation: Boolean!
  }

  type Tokenomics {
    allocations: [TokenAllocation!]!
    totalSupply: String!
    timestamp: Float!
  }

  type TokenAllocation {
    category: String!
    percentage: Float!
    lockPeriod: Int!
  }

  type Query {
    projects: [Project!]!
    project(id: ID!): Project
    featuredProjects: [Project!]!
  }

  type Mutation {
    createProject(input: ProjectInput!): Project!
    updateProject(id: ID!, input: ProjectInput!): Project!
    deleteProject(id: ID!): Boolean!
    completeStep(projectId: ID!, step: String!): Project!
  }

  input ProjectInput {
    name: String!
    type: String!
    description: String
  }
`;