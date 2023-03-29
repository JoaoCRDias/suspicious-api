README
gcloud builds submit --tag gcr.io/suspicious-project-381323/cd-suspicious-api --project=suspicious-project-381323

gcloud run deploy suspicious-api --image gcr.io/suspicious-project-381323/cd-suspicious-api --region southamerica-east1 --project=suspicious-project-381323 --allow-unauthenticated --env-vars-file .env.yaml

gcloud iam service-accounts list --project=suspicious-project-381323
