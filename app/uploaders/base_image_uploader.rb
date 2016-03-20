class BaseImageUploader < BaseUploader
  include CarrierWave::MiniMagick

  def store_dir
    File.join('uploads', env_subdir, model.class.to_s.underscore.to_s, model.id.to_s, mounted_as.to_s)
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end

  def as_json(options = nil)
    serializable_hash
  end

  def serializable_hash(options = nil)
    if model.send("#{mounted_as}?")
      Hash[versions.map { |name, version| [name, version.url] }].merge(origin: url)
    end
  end
end
