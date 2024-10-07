pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                // Pull the latest code from the GitHub repository
                git branch: 'main', url: 'https://github.com/AnilBai/Chemical-Supplies.git'
            }
        }
        stage('Deploy to EC2') {
            steps {
                // SSH into the EC2 instance and pull the latest changes
                sh """
                ssh -o StrictHostKeyChecking=no ubuntu@54.210.143.177 << EOF
                  cd /var/www/html/chemical-supplies
                  git pull origin main
                  sudo systemctl restart nginx
                  exit
                EOF
                """
            }
        }
    }
}
