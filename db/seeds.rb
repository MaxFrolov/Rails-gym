DatabaseCleaner.strategy = :truncation, { except: %w(public.schema_migrations) }
DatabaseCleaner.clean

User.create({ email: 'admin@example.com', password: '123123123', confirmed_at: Time.now,
              first_name: 'Max', last_name: 'Frolov',
              birthday: Faker::Time.between(45.years.ago, 25.years.ago), role: :admin,
              avatar: File.open(File.join(Rails.root, 'test', 'fixtures' , 'avatars', "#{rand(1..4)}.png")),
              phone: Faker::PhoneNumber.cell_phone})
post_incr = 0
nutrition_incr = 0
event_incr = 0
product_incr = 0

12.times do
  User.create({ email: Faker::Internet.email, password: Faker::Internet.password(8), confirmed_at: Time.now,
                first_name: Faker::Name.first_name, last_name: Faker::Name.last_name,
                birthday: Faker::Time.between(45.years.ago, 25.years.ago), role: :member,
                avatar: File.open(File.join(Rails.root, 'test', 'fixtures' , 'avatars', "#{rand(1..4)}.png")),
                phone: Faker::PhoneNumber.cell_phone})

  User.find_by(first_name: 'Max').posts.create ({image: File.open(File.join(Rails.root, 'test', 'fixtures' , 'blog-img', "blog_picture#{post_incr += 1}.jpg")),
                 header: Faker::Hipster.sentence(3), short_description: Faker::Hipster.sentence(5),
                 post_description: Faker::Hipster.paragraph(8), post_date: Faker::Time.between(3.month.ago, Time.now, :all),
                                                 post_category: rand(0..3)})



  Food.create({ category: rand(0..3), short_description: Faker::Hipster.sentence(5),
                image: File.open(File.join(Rails.root, 'test', 'fixtures' , 'nutrition', "#{nutrition_incr += 1}.jpg")),
                food_description: Faker::Hipster.paragraph(8), header: Faker::Hipster.sentence(3) })

  Event.create({ header: Faker::Hipster.sentence(3), short_description: Faker::Hipster.sentence(5), description: Faker::Hipster.paragraph(8),
                start_date: Faker::Date.forward(14),  end_date: Faker::Date.forward(23),
                 image: File.open(File.join(Rails.root, 'test', 'fixtures' , 'events', "#{event_incr += 1}.jpg")), user_id: 1})
  Product.create ({ name: Faker::Commerce.product_name, category: rand(1..4), price: Faker::Commerce.price, product_description: Faker::Hipster.paragraph(8),
                    image_product: File.open(File.join(Rails.root, 'test', 'fixtures' , 'products', "#{product_incr += 1}.jpg")),
                    composition: Faker::Commerce.department(5), recommendation_for_use: Faker::Hipster.sentence(5),
                    grams: Faker::Number.decimal(2), count: rand(1..15), sale: false})
end

# 25.times do
# Comment.create({ message: Faker::Hipster.sentence(3), user_id: rand(1..12), post_id: rand(1..12), food_id: rand(1..12), email: Faker::Internet.email,
#                  name: Faker::Name.first_name, comment_date: Faker::Time.between(3.month.ago, Time.now, :all)})
# end
