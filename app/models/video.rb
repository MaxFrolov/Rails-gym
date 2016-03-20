class Video < Post
  YOUTUBE_REGEXP = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/
  VIMEO_REGEXP = /^(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/

  before_save :set_video_info, if: :link_changed?
  before_save :load_preview_image, if: :credentials_changed?

  validates :link, presence: true
  validate :validate_link, if: :link_changed?

  enum service: {vimeo: 0, youtube: 1}

  mount_uploader :preview_image, Post::PreviewImageUploader

  def credentials_changed?
    video_id_changed? || service_changed?
  end

  private

  def set_video_info
    if link =~ VIMEO_REGEXP
      self.service = :vimeo
      self.video_id = $5
    elsif link =~ YOUTUBE_REGEXP
      self.service = :youtube
      self.video_id = $7
    end
  end

  def validate_link
    errors.add(:link, :invalid) unless link =~ VIMEO_REGEXP || link =~ YOUTUBE_REGEXP
  end

  def load_preview_image
    if youtube?
      url = "http://i1.ytimg.com/vi/#{video_id}/maxresdefault.jpg"
      self.remote_preview_image_url = url if URLChecker.accessible?(url, false)
    end
  end
end
