#!/bin/bash
cd /home/kavia/workspace/code-generation/chatease-35396-0e025102/chat_ease
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

