## Proxy for ffmpeg

Unless you rebuild ffmpeg, the hls codec doesn't provide support for adding 
headers to the outbound requests.

Additionally, ffmpeg's support for passing requests via proxies is not
mature and so this image is designed to work with rmacd/ffmpeg (which has
a built-in rule that sends data to a proxy via a couple of iptables rules).

So to save rebuilding ffmpeg, using this Docker image allows the token to be
added. 

## Instructions

Add your bearer token to `bearer.txt` and execute the image as follows:

```
docker run -v $(pwd):/var/run/proxy -p 5050:5050 ffmpeg-proxy
```

Test the configuration by sending a request via `curl`:

```
https_proxy=https://localhost:5050 curl -v "https://example.com/api/videos/3F47743E-41E3-43AD-BC84-A512E96C48E2/protectionKey?api-version=1.0" --proxy-insecure -k
```
