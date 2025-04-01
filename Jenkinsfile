pipeline {
    agent any
    stages {
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
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'node server.js'
            }
        }
    }
}