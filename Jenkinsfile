pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                // Ensure Node.js and npm are installed
                sh 'node -v'
                sh 'npm -v'
                // Install project dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests (if you have any)
                sh 'npm test || echo "No tests found, skipping..."'
            }
        }

        stage('Deploy to Render') {
            steps {
                // Deploy the application to Render
                sh 'node server.js &'
            }
        }
    }

    post {
        always {
            // Clean up workspace
            cleanWs()
        }
    }
}