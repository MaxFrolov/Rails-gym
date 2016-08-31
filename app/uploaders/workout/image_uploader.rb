class Workout::ImageUploader < BaseImageUploader
  version :small do
    process resize_to_limit: [nil, 225]
  end
end
