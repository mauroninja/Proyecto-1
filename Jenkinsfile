pipeline {
    agent any

    options {
        timestamps()
        timeout(time: 15, unit: 'MINUTES')
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        // Nombre propio para no chocar con otros proyectos de Docker Compose
        COMPOSE_PROJECT_NAME = 'proyecto1-ci'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Construir imagenes') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Levantar contenedores') {
            steps {
                sh 'docker compose up -d'
                sh 'docker compose ps'
            }
        }

        stage('Verificar comunicacion') {
            steps {
                // nginx debe poder consultar a la app por su nombre de servicio
                sh '''
                    for i in 1 2 3 4 5 6 7 8 9 10; do
                        if docker compose exec -T nginx wget -qO- http://app:3000/health; then
                            echo ""
                            echo "Comunicacion nginx -> app OK"
                            exit 0
                        fi
                        echo "Intento $i fallido, reintentando en 3 s..."
                        sleep 3
                    done
                    echo "nginx no pudo comunicarse con app"
                    exit 1
                '''
            }
        }
    }

    post {
        always {
            sh 'docker compose logs --no-color > compose-logs.txt || true'
            archiveArtifacts artifacts: 'compose-logs.txt', allowEmptyArchive: true
            sh 'docker compose down -v || true'
        }
        success {
            echo 'Pipeline ejecutado correctamente'
        }
        failure {
            echo 'El pipeline fallo, revisar los logs de la ejecucion'
        }
    }
}
