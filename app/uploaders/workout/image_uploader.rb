class Workout::ImageUploader < BaseImageUploader
  version :small do
    process resize_to_fill(800, 600, gravity = 'Center')
  end
end
