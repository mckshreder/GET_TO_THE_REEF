module ApplicationHelper
	
	def embed(youtube_url)
    youtube_id = youtube_url.split("=").last
    content_tag(:iframe, nil, src: "//www.youtube.com/embed/#{youtube_id}?autoplay=1&controls=0&rel=0&showinfo=0&autohide=1")
  	end

end
