class EventSerializer < ActiveModel::Serializer
  attributes :id, :header, :short_description, :start_date, :end_date, :image_url, :description
end
