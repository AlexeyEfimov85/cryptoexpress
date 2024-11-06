require('dotenv').config();


const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REPOSITORY, DEPLOY_REF,
} = process.env;

module.exports = {
  apps : [{
    name   : "backend",
    script : "dist/index.js"
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,
      'post-deploy': 'npm i && npm run build',
    },
  },
}
