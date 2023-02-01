#!bin/bash
queueStatus='{
    "expand": "queuedBuilds",
    "link": {
        "href": "https://bamboo.tools.telstra.com/rest/api/latest/queue",
        "rel": "self"
    },
    "queuedBuilds": {
        "size": 1,
        "expand": "queuedBuild",
        "queuedBuild": [
            {
                "planKey": "B2BSAL-TSFED",
                "buildNumber": 37,
                "buildResultKey": "OP-ATAS-JOB1-37",
                "triggerReason": "Scheduled build",
                "link": {
                    "href": "https://bamboo.tools.telstra.com/rest/api/latest/result/OP-ATAS-JOB1-37",
                    "rel": "self"
                }
            }
        ],
        "start-index": 0,
        "max-result": 1
    }
}'
queuedBuilds=$(echo $queueStatus | jq -r '.queuedBuilds')
queuedBuild=$(echo $queuedBuilds | jq -r '.queuedBuild')

echo "queuedBuild: "$queuedBuild

echo "$queuedBuild"|jq -c '.[]' | while read build; do
        echo "build is: " $build
        planKey=$(echo $build | jq -r '.planKey')
        echo "planKey is: " $planKey
        buildNumber=$(echo $build | jq -r '.buildNumber')
        echo "buildNumber is: " $buildNumber
        if [ $planKey = "B2BSAL-TSFED" ]; then
                echo "build ${buildNumber} is in queue.so exit from process"
                exit 0
        fi
done



