cp -r dist rss
gsutil rsync -d -r rss gs://install-versions.risevision.com/widgets/rss
gsutil -m acl -r ch -u AllUsers:R gs://install-versions.risevision.com/widgets/rss
gsutil -m setmeta -r -h Cache-Control:private,max-age=0 gs://install-versions.risevision.com/widgets/rss
