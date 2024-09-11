export default {
  branches: ['main'],
  repositoryUrl: 'git@github.com:jarrodconnolly/prisma-generator-enum.git',
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    "@semantic-release/npm",
    "@semantic-release/git"
  ]
};