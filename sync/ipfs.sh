cd /volume1/data/ipfs
pwd > /tmp/dir.txt
HOME=/volume1/data/ipfs ipfs daemon --enable-pubsub-experiment &
node orbit_server.js >> /volume1/data/ipfs/orbit_server.log &

echo end >> /tmp/dir.txt
