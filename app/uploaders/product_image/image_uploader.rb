class ProductImage::ImageUploader < BaseImageUploader
  version :medium do
    process resize_to_limit: [nil, 1024]
  end

  version :mobile do
    process resize_to_limit: [768, nil]
  end

  version :thumb, from_version: :mobile do
    process resize_to_fill: [100, 100]
  end
end
