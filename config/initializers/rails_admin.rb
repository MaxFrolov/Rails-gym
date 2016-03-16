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
  config.included_models = ['User', 'Post', 'Product', 'UserAdvice', 'OrderItem', 'Order', 'Food', 'Event', 'Workout', 'Plan']

  config.actions do
    dashboard                     # mandatory
    index                         # mandatory
    new
    export
    bulk_delete
    show
    edit
    delete
    show_in_app

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model Post do
    include_fields :id, :image, :header, :short_description, :post_description,
                   :post_category, :tag_list

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end
  end

  config.model Food do
    include_fields :id, :image, :header, :short_description, :food_description,
                   :category, :tag_list

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end
  end
end
