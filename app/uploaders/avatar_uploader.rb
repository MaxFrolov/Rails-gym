class AvatarUploader < CarrierWave::Uploader::Base
  include CarrierWave::MiniMagick

  storage :file

  process convert: 'jpg'

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def store_dir
    sub_dir = model.id % 100 # 100 dirs for all images
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{sub_dir}/#{model.id}"
  end

  def filename
    @name ||= "#{timestamp}-#{super}" if original_filename.present? and super.present?
  end

  def timestamp
    var = :"@#{mounted_as}_timestamp"
    model.instance_variable_get(var) or model.instance_variable_set(var, Time.now.to_i)
  end
end
