class Post::ImageUploader < BaseImageUploader
  version :medium do
    process resize_to_limit: [nil, 1024]
  end
end
