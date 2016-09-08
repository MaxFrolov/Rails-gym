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
  config.included_models = %w(User Post Product OrderItem Order Food Workout Plan Video Article Gallery ItemsCategory
    Exercise ListOfExercise UsersTraining UserTrainingExercise UserTrainingExerciseSet Category ExerciseImage ExerciseVideo)

  hidden_modules = %w(ItemsCategory)

  config.actions do
    dashboard do
      except hidden_modules
    end
    index do
      except hidden_modules
    end
    new do
      except hidden_modules + %w(Post Exercise)
    end
    export do
      except hidden_modules
    end
    bulk_delete do
      except hidden_modules
    end
    show do
      except hidden_modules + %w(Post Exercise)
    end
    edit do
      except hidden_modules + %w(Post Exercise)
    end
    delete do
      except hidden_modules
    end
    show_in_app do
      only %w(Post Video Article)

      controller do
        proc do
          path = "blog/post?id=#{@object.id}"
          redirect_to frontend_url(path: path)
        end
      end
    end

    ## With an audit adapter, you can add:
    # history_index
    # history_show
  end

  config.model User do
    label 'Пользователь'
    label_plural 'Пользователи'
    object_label_method :label_for_admin
  end

  config.model UsersTraining do
    label 'Тренировка'
    label_plural 'Тренировки'
    navigation_label 'Расписания тренировок'

    list do
      exclude_fields :created_at, :updated_at, :id
    end

    edit do
      include_fields :id, :date, :user_training_exercises, :user
      field :user_training_exercises do
        associated_collection_scope do
          Proc.new { |scope|
            scope.where(users_training_id: nil)
          }
        end
      end
    end
  end

  config.model UserTrainingExercise do
    label 'Упражнениe'
    label_plural 'Упражнения'
    navigation_label 'Расписания тренировок'

    list do
      exclude_fields :created_at, :updated_at, :id
    end

    edit do
      field :list_of_exercise do
        label 'Упражнение'
      end
      exclude_fields :users_training
    end
  end

  config.model UserTrainingExerciseSet do
    label 'Информация по упражнению'
    label_plural 'Информация по упражнению'

    navigation_label 'Расписания тренировок'
    object_label_method :label_for_admin

    list do
      exclude_fields :created_at, :updated_at, :id
    end

    edit do
      exclude_fields :user_training_exercise
    end
  end

  config.model Order do
    label 'Заказ'
    label_plural 'Заказы'
    navigation_label 'Магазин'
  end

  config.model OrderItem do
    label 'Заказанный товар'
    label_plural 'Заказанные товары'
    navigation_label 'Магазин'
  end

  config.model Product do
    label 'Продукт'
    label_plural 'Продукты'
    navigation_label 'Магазин'
  end

  config.model Post do
    label 'Пост'
    label_plural 'Посты'
    navigation_label 'Блог'
    include_fields :id, :type, :title, :created_at, :updated_at, :tag_list

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end
  end

  config.model Video do
    label 'Пост с видео'
    label_plural 'Посты с видео'
    include_fields :id, :title, :subtitle, :link, :video_id, :service, :source, :description, :tag_list,
                   :created_at, :updated_at, :type, :categories, :preview_image
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
      exclude_fields :video_id, :service, :type, :preview_image
      field :description, :rich_editor
      field :link
      field :categories do
        associated_collection_scope do
          Proc.new { |scope|
            scope.joins(:items_categories).where(items_categories: { target_type: 'Post' })
          }
        end
      end
    end

    show do
      exclude_fields :type, :video
      field :description do
        pretty_value do
          value.html_safe
        end
      end
    end
  end

  config.model Article do
    label 'Пост с картинкой'
    label_plural 'Посты с картинкой'
    include_fields :id, :title, :subtitle, :source, :description, :tag_list, :created_at, :updated_at, :type, :categories

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
      field :description, :rich_editor
      field :categories do
        associated_collection_scope do
          Proc.new { |scope|
            scope.joins(:items_categories).where(items_categories: { target_type: 'Post' }).uniq
          }
        end
      end
    end

    show do
      exclude_fields :type
      field :description do
        pretty_value do
          value.html_safe
        end
      end
    end
  end

  config.model Gallery do
    include_fields :id, :photo, :description, :created_at
    label 'Галлерея'
    label_plural 'Галлерея'

    group :photo do
      label 'Image options'

      field :photo, :carrierwave
      field :remote_photo_url, :string
    end
  end

  config.model Food do
    label 'Еда'
    label_plural 'Еда'

    list do
      exclude_fields :id, :created_at,  :updated_at, :comments_count, :users, :likes_count, :description, :items_categories
    end

    edit do
      exclude_fields :id, :created_at,  :updated_at, :comments_count, :users, :likes_count, :items_categories

      field :description, :rich_editor
      field :categories do
        associated_collection_scope do
          Proc.new { |scope|
            scope.joins(:items_categories).where(items_categories: { target_type: 'Food' }).uniq
          }
        end
      end
    end

    configure :tag_list  do
      partial 'tag_list_with_autocomplete'
    end

    field :tag_list do
      label 'Tags'
    end
  end

  config.model Category do
    label 'Категория'
    label_plural 'Категории'
    edit do
      exclude_fields :target, :items_categories, :posts, :foods, :workouts
    end
  end

  config.model Workout do
    navigation_label 'Упражнения'
    label 'Тренировка'
    label_plural 'Тренировки'
    include_fields :id, :title, :subtitle, :image, :level, :categories, :exercises

    edit do
      field :categories do
        associated_collection_scope do
          Proc.new { |scope|
            scope.joins(:items_categories).where(items_categories: { target_type: 'Workout' })
          }
        end
      end
    end
  end

  config.model Exercise do
    label 'Пост упражнения'
    label_plural 'Посты упражнений'
    navigation_label 'Упражнения'

    include_fields :id, :type, :title, :created_at, :updated_at
  end

  config.model ExerciseVideo do
    label 'Упражнение с видео'
    label_plural 'Упражнения с видео'
    include_fields :id, :title, :subtitle, :link, :video_id, :service, :description,
                   :created_at, :updated_at, :type, :preview_image, :reps, :sets, :time, :workout
    group :image do
      label 'Image options'

      field :image, :carrierwave
      field :remote_image_url, :string
    end

    list do
      exclude_fields :description, :image, :remote_image_url, :type
    end

    edit do
      exclude_fields :video_id, :service, :type, :preview_image
      field :description, :rich_editor
      field :link
    end

    show do
      exclude_fields :type, :video
      field :description do
        pretty_value do
          value.html_safe
        end
      end
    end
  end

  config.model ExerciseImage do
    label 'Упражнение с картинками'
    label_plural 'Упражнения с картинками'
    include_fields :id, :title, :subtitle, :description, :created_at, :updated_at, :type,
                   :reps, :sets, :time, :workout

    group :image do
      label 'Image options'

      field :image, :carrierwave
      field :remote_image_url, :string
    end

    list do
      exclude_fields :description, :remote_image_url, :type
    end

    edit do
      exclude_fields :type
      field :description, :rich_editor
    end

    show do
      exclude_fields :type
      field :description do
        pretty_value do
          value.html_safe
        end
      end
    end
  end

  config.model ListOfExercise do
    label 'Упражнение'
    label_plural 'Упражнения'
    navigation_label 'Упражнения'
    include_fields :id, :title, :measuring, :level
  end
end
