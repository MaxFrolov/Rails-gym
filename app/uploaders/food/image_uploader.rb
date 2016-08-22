class Food::ImageUploader < BaseImageUploader
  version :medium do
    process resize_to_limit: [nil, 202]
  end
end