class Post::ImageUploader < BaseImageUploader
  version :medium do
    process resize_to_limit: [nil, 1024]
  end

  version :small do
    process resize_to_fill(450, 250, gravity = 'Center')
  end
end
