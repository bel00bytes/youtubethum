import React, { useState, useEffect } from "react";
import copy from "copy-to-clipboard";

const Index = () => {
  const [videoURL, setVideoURL] = useState("");
  const [thumbnailOptions, setThumbnailOptions] = useState([]);
  const [isAdSenseLoaded, setIsAdSenseLoaded] = useState(false);

  useEffect(() => {
    // Load the AdSense script once the component is mounted
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6199756572722839";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => setIsAdSenseLoaded(true);
    document.body.appendChild(script);
  }, []);

  const getYouTubeThumbnail = (url) => {
    let regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
    let match = url.match(regExp);

    if (match && match[1].length === 11) {
      const videoURL = match[1];
      const thumbnailBaseUrl = "http://img.youtube.com/vi/";

      const options = [
        { resolution: "HD (1280x720)", code: "maxresdefault" },
        { resolution: "SD (640x480)", code: "sddefault" },
        { resolution: "Normal (480x360)", code: "hqdefault" },
        { resolution: "Medium (320x180)", code: "mqdefault" },
        { resolution: "Low (120x90)", code: "default" },
      ];

      const thumbnailOptions = options.map((option) => ({
        resolution: option.resolution,
        url: `${thumbnailBaseUrl}${videoURL}/${option.code}.jpg`,
      }));

      setThumbnailOptions(thumbnailOptions);
      setVideoURL("");
    } else {
      setThumbnailOptions([]);
    }
  };

  // Function to handle downloading the thumbnail
  const downloadThumbnail = (url) => {
    // Create an anchor element to trigger the download
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "thumbnail.jpg";
    anchor.click();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">
          YouTube Thumbnail Downloader
        </h1>
        <p className="centre-text text-gray-600">
          Download high-quality thumbnails from YouTube videos
        </p>
        <div>
          {/* Your AdSense ad code here */}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6199756572722839"
            data-ad-slot="7912346351"  // Replace with your Ad Slot number
            data-ad-format="auto"
          />
        </div>
      </header>
      <div className="input-text">
        <input
          type="text"
          className="input-text"
          placeholder="Enter YouTube URL"
          value={videoURL}
          onChange={(e) => setVideoURL(e.target.value)}
        />
      </div>
      <div className="text-center mt-2">
        <button
          className="btn-blue"
          onClick={() => getYouTubeThumbnail(videoURL)}
        >
          Download YouTube Thumbnails
        </button>
      </div>
      {thumbnailOptions.length > 0 && (
        <div className="mt-8">
          <h1>Thumbnail Options</h1>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {thumbnailOptions.map((option, index) => (
              <div key={index} className="thumbnail-option">
                <img src={option.url} alt={`Thumbnail ${index + 1}`} />
                <div className="text-center mt-2">
                  <button
                    className="btn-blue mr-2"
                    onClick={() => copy(option.url)}
                  >
                    Copy Image URL
                  </button>
                  <button
                    className="btn-blue btn-des"
                    onClick={() => downloadThumbnail(option.url)}
                  >
                    Download Thumbnail
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {isAdSenseLoaded && (
        <div>
          {/* Your AdSense ad code here */}
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-6199756572722839"
            data-ad-slot="7912346351"  // Replace with your Ad Slot number
            data-ad-format="auto"
          />
        </div>
      )}
      <div className="container mx-auto px-4 py-8">
        <h1>The Importance of YouTube Thumbnail Downloaders</h1>
        <p className="centre-text text-gray-600">
          In today's digital age, where online content is consumed at an unprecedented rate, the importance of YouTube thumbnail downloaders cannot be overstated. Thumbnail downloaders play a crucial role in content creation, marketing, and user experience across various platforms, most notably on video-sharing sites like YouTube. Here, we delve into the significance of YouTube thumbnail downloaders and why they are an indispensable tool for both creators and consumers of online content.
        </p>
        <h1>Enhanced Visual Representation:</h1>
        <p className="centre-text text-gray-600">YouTube thumbnails serve as the first impression of a piece of content. They offer a sneak peek into the video, article, or webpage they represent. A well-crafted YouTube thumbnail can convey the essence of the content, making it more attractive and inviting to users. By allowing users to download these YouTube thumbnails, downloaders empower content creators to carefully curate the visual representation of their work.</p>
        <h1>Improved Content Accessibility:</h1>
        <p className="centre-text text-gray-600">Accessibility is a core principle of online content. YouTube thumbnail downloaders aid in content accessibility by providing users with easy access to visuals that might otherwise be challenging to obtain. This is particularly relevant for educational content, where YouTube thumbnails can serve as reference images for presentations and reports.</p>
      </div>
      <footer className="text-center text-gray-600 mt-8">
  &copy; 2023 Youtube Thumbnail Downloader YB. All rights reserved. | YouTube Thumbnail Service, Download YouTube Thumbnails, High-Quality Thumbnails
</footer>
    </div>
  );
};

export default Index;
