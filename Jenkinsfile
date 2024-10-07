pipeline {
    agent any
    
    environment {
        DEPLOY_SERVER = "54.210.143.177"
        DEPLOY_PATH = "/var/www/html/chemical-supplies" // Update as necessary
    }

    stages {
        stage('Clone Repository') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo 'Building...'
                // Add any build steps if necessary, for a static site it's optional
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Remove existing files and copy new files
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${DEPLOY_SERVER} 'rm -rf ${DEPLOY_PATH}/*'
                    scp -o StrictHostKeyChecking=no -r * ubuntu@${DEPLOY_SERVER}:${DEPLOY_PATH}
                    """
                }
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Deployment Failed.'
        }
    }
}
