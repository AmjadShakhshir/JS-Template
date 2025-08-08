#!/bin/bash

# Build script to handle API routes based on deployment target

echo "Building with DEPLOYMENT_TARGET: ${DEPLOYMENT_TARGET:-server}"

if [ "$DEPLOYMENT_TARGET" = "static" ]; then
  echo "Building for static export - temporarily disabling API routes"
  
  # Backup API routes if they exist
  if [ -d "app/api" ]; then
    mv app/api app/.api_backup
    echo "API routes backed up to app/.api_backup"
  fi
  
  # Run the static build
  next build
  BUILD_EXIT_CODE=$?
  
  # Restore API routes
  if [ -d "app/.api_backup" ]; then
    mv app/.api_backup app/api
    echo "API routes restored"
  fi
  
  exit $BUILD_EXIT_CODE
else
  echo "Building for server deployment - keeping API routes"
  next build
fi
