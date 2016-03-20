class BaseUploader < CarrierWave::Uploader::Base
  def store_dir
    Rails.root.join('storage', env_subdir, model.class.to_s.underscore.to_s, mounted_as.to_s).to_s
  end

  def env_subdir
    Rails.env.test? ? 'test' : ''
  end
end
