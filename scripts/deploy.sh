#!/bin/bash

if [[ -z "${DASHBOARD_ENV}" ]]; then
  DASHBOARD_ENV="GLOBAL"
fi

if [[ $DASHBOARD_ENV = "EU" ]]; then
  ORIGINAL_BACKEND_HOST="backend.gohidoc.com"
  EU_BACKEND_HOST="eu-prod.cara.care"

  ORIGINAL_NETLIFY_SITE_NAME="nutri-dashboard"
  EU_NETLIFY_SITE_NAME="eu-nutri-dashboard"

  ORIGINAL_HOST="web.cara.care"
  EU_HOST="eu-web.cara.care"

  echo "⌛ replacing \"${ORIGINAL_BACKEND_HOST}\" with \"${EU_BACKEND_HOST}\"..."
  echo
  sed -i.tmp "s/${ORIGINAL_BACKEND_HOST}/${EU_BACKEND_HOST}/g" "$PWD/public/_redirects"

  echo "⌛ replacing \"${ORIGINAL_NETLIFY_SITE_NAME}\" with \"${EU_NETLIFY_SITE_NAME}\"..."
  echo
  sed -i.tmp "s/${ORIGINAL_NETLIFY_SITE_NAME}/${EU_NETLIFY_SITE_NAME}/g" "$PWD/public/_redirects"

  echo "⌛ replacing \"${ORIGINAL_HOST}\" with \"${EU_HOST}\"..."
  echo
  sed -i.tmp "s/${ORIGINAL_HOST}/${EU_HOST}/g" "$PWD/public/_redirects"
  sed -i.tmp "s/${ORIGINAL_HOST}/${EU_HOST}/g" "$PWD/src/utils/constants.ts"

  echo "⌛ cleaning up .tmp files..."
  echo
  find . -type f -name '*.tmp' -delete

  echo "✅ All done!"
  echo
fi
