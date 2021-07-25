#!/bin/bash

if [[ -z "${DASHBOARD_ENV}" ]]; then
  DASHBOARD_ENV="GLOBAL"
fi

if [[ $DASHBOARD_ENV = "EU" ]]; then
  ORIGINAL_HOST="web.gohidoc.com"
  EU_HOST="eu-dashboard.cara.care"

  echo "⌛ replacing \"${ORIGINAL_HOST}\" with \"${EU_HOST}\"..."
  echo
  sed -i.tmp "s/${ORIGINAL_HOST}/${EU_HOST}/g" "$PWD/src/utils/constants.ts"

  echo "⌛ replacing Kabelwerk's URL"
  echo
  sed -i.tmp "s/eu-staging-chat/eu-prod-chat/g" "$PWD/src/utils/constants.ts"

  echo "⌛ cleaning up .tmp files..."
  echo
  find . -type f -name '*.tmp' -delete

  echo "✅ All done!"
  echo
fi
