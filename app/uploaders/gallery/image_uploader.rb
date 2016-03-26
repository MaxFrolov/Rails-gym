class Gallery::ImageUploader < BaseImageUploader
  version :medium do
    process resize_to_limit: [nil, 1024]
  end

  version :small do
    process resize_to_fill(320, 320, gravity = 'Center')
  end
end