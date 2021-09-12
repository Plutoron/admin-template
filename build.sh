rm -rf admin*
npm run build
mv dist admin
tar -czvf admin.tar.gz admin
scp ./admin.tar.gz root@47.104.11.142:/home
# Lyz@web123