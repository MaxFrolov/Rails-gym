RailsAdmin.config do |config|

  ### Popular gems integration

  ## == Devise ==
  # config.authenticate_with do
  #   warden.authenticate! scope: :user
  # end
  # config.current_user_method(&:current_user)

  ## == Cancan ==
  # config.authorize_with :cancan

  ## == Pundit ==
  # config.authorize_with :pundit

  ## == PaperTrail ==
  # config.audit_with :paper_trail, 'User', 'PaperTrail::Version' # PaperTrail >= 3.0.0

  ### More at https://github.com/sferik/rails_admin/wiki/Base-configuration
  config.included_models = ['User', 'Post', 'Product', 'UserAdvice', 'OrderItem', 'Order', 'Food', 'Event', 'Workout', 'Plan', 'Video', 'Article', 'Gallery']

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new do
      except %w(Post)
    end
    export
    bulk_delete
    show do
      except %w(Post)
    end
    edit do
      except %w(Post)
    end
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model Post do
    include_fields :id, :image, :type, :title, :subtitle, :description,
                   :post_category, :tag_list

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end
  end

  config.model Video do
    include_fields :id, :title, :subtitle, :description, :link, :video_id, :service, :source, :tag_list,
                   :created_at, :updated_at, :type

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end

    group :image do
      label 'Image options'

      field :image, :carrierwave
      field :remote_image_url, :string
      field :source
    end

    list do
      exclude_fields :description, :image, :remote_image_url, :type
    end

    edit do
      exclude_fields :video_id, :type, :service
      field :created_at
    end

    show do
      exclude_fields :type
      include_fields :preview_image
    end
  end

  config.model Article do
    include_fields :id, :title, :subtitle, :source, :description, :tag_list,
                   :created_at, :updated_at, :type

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end

    group :image do
      label 'Image options'

      field :image, :carrierwave
      field :remote_image_url, :string
      field :source
    end

    list do
      exclude_fields :description, :remote_image_url, :type
    end

    edit do
      exclude_fields :type
      field :created_at
    end

    show do
      exclude_fields :type
      include_fields :preview_image
    end
  end

  config.model Gallery do
    include_fields :id, :photo, :description, :created_at

    group :photo do
      label 'Image options'

      field :photo, :carrierwave
      field :remote_photo_url, :string
    end
  end

  config.model Food do
    include_fields :id, :image, :title, :subtitle, :description,
                   :category, :tag_list

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end
  end
end
