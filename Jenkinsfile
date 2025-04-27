pipeline {
    agent any

    triggers {
        githubPush()
    }

    environment {
        SLACK_CHANNEL = '#Mercy_IP1'
        RENDER_URL = 'https://gallery-nagf.onrender.com'
    }

    stages {
        stage('Clone Repository') {   // Added new stage to clone code
            steps {
                echo "Cloning repository..."   // Added echo message
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
            post {
                failure {
                    mail to: 'syokaumercy2@gmail.com',
                         subject: "Build Failed: ${env.BUILD_ID}",
                         body: "The build failed during the test stage. Check Jenkins for details."
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build || echo "No build step defined, skipping..."'
            }
        }

        stage('Deploy') {
            steps {
                echo "Code pushed to GitHub. Render will auto-deploy if GitHub integration is enabled."
            }
            post {
                success {
                    slackSend (
                        channel: env.SLACK_CHANNEL,
                        message: "✅ *Build #${env.BUILD_ID}* deployed successfully!\n🌐 ${env.RENDER_URL}"
                    )
                }
            }
        }
    }
}
