class PostSerializer < ActiveModel::Serializer
  attributes :id, :short_description, :picture_url, :news_date, :news, :header

  has_many :comments
end
