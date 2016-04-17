class Workout::ImageUploader < BaseImageUploader
  version :small do
    process resize_to_fill(320, 320, gravity = 'Center')
  end
end
