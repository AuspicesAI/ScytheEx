from elasticsearch import Elasticsearch
import time
import json

# Initialize Elasticsearch connection
es = Elasticsearch([{'host': 'localhost', 'port': 9200, 'scheme': 'http'}])

def fetch_logs_for_prediction():
    """
    Fetch logs from Elasticsearch that are marked as 'pending' for prediction.
    """
    query = {
        "query": {
            "match": {
                "prediction_status": "pending"  # Only fetch logs pending for AI processing
            }
        },
        "size": 100  # Fetch 100 logs at a time
    }

    # Fetch logs from Elasticsearch
    response = es.search(index="scytheex-*", body=query)
    return response['hits']['hits']

def update_log_with_prediction(log_id, prediction, index_name):
    """
    Update Elasticsearch logs with AI predictions.
    """
    try:
        es.update(
            index=index_name,
            id=log_id,
            body={
                "doc": {
                    "prediction_status": "completed",  # Mark as completed
                    "prediction": prediction,  # Store the AI prediction
                    "updated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ")  # Add a timestamp for when the log was updated
                }
            }
        )
        print(f"Updated log ID {log_id} in index {index_name} with prediction: {prediction}")
    except Exception as e:
        print(f"Failed to update log ID {log_id} in index {index_name}: {e}")

def simulate_prediction(log):
    """
    Simulate an AI prediction based on some fields. Replace this with actual AI logic.
    """
    # Example logic: if protocol is TCP, mark as 'safe', otherwise 'malicious'
    if 'Protocol' in log and log['Protocol'] == "TCP":
        return "safe"
    else:
        return "malicious"

def main():
    logs = fetch_logs_for_prediction()

    for log_entry in logs:
        log = log_entry['_source']
        log_id = log_entry['_id']
        index_name = log_entry['_index']

        # Simulate AI prediction (replace with actual model prediction)
        prediction = simulate_prediction(log)

        # Update log with the AI prediction
        update_log_with_prediction(log_id, prediction, index_name)

if __name__ == "__main__":
    main()
