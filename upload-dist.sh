cp -r dist rss
gsutil -m cp -r rss gs://install-versions.risevision.com/widgets/
gsutil -m acl -r ch -u AllUsers:R gs://install-versions.risevision.com/widgets/rss
gsutil -m setmeta -r -h Cache-Control:private,max-age=0 gs://install-versions.risevision.com/widgets/rss
