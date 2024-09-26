#!/bin/bash

# Apply the ScytheEx Elasticsearch template
curl -X PUT "localhost:9200/_template/scytheex_template" -H 'Content-Type: application/json' -d @templates/scytheex-template.json

# Check if the template was applied successfully
curl -X GET "localhost:9200/_template/scytheex_template?pretty"