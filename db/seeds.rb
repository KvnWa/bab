# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts 'Seeding...'

Chatroom.create ([
  {
    name: 'Music',
    image_url: 'https://cdn-icons-png.flaticon.com/128/3659/3659784.png',
    bio: 'All About Music'
  },
  {
    name: 'Sports',
    image_url: 'https://cdn-icons.flaticon.com/png/128/5564/premium/5564944.png?token=exp=1650552040~hmac=dc83c8e5abfed3bdf96cfa12c70bff22',
    bio: 'All About Sports'
  },
  {
    name: 'Events',
    image_url: 'https://cdn-icons-png.flaticon.com/128/3771/3771178.png',
    bio: 'All About Events'
  },
  {
    name: 'Code',
    image_url: 'https://cdn-icons-png.flaticon.com/128/2881/2881142.png',
    bio: 'All About Coding'
  },
  {
    name: 'Stocks',
    image_url: 'https://cdn-icons-png.flaticon.com/128/2910/2910311.png',
    bio: 'All About Stocks'
  },
  {
    name: 'Crypto',
    image_url: 'https://cdn-icons-png.flaticon.com/128/4843/4843056.png',
    bio: 'All About Crypto'
  },
  {
    name: 'NFT',
    image_url: 'https://cdn-icons-png.flaticon.com/128/6229/6229217.png',
    bio: 'All About NFTs'
  },
  {
    name: 'Games',
    image_url: 'https://cdn-icons-png.flaticon.com/128/1083/1083364.png',
    bio: 'All About Games'
  },
  {
    name: 'Health',
    image_url: 'https://cdn-icons-png.flaticon.com/128/2791/2791163.png',
    bio: 'All About Health'
  }
])

first_user = User.create(username: 'harris', password: '1234', password_confirmation: '1234', image_url: 'https://cdn-icons-png.flaticon.com/128/3135/3135715.png')
second_user = User.create(username: 'lynden', password: '1234', password_confirmation: '1234', image_url: 'https://cdn-icons-png.flaticon.com/128/236/236832.png')
third_user = User.create(username: 'francis', password: '1234', password_confirmation: '1234', image_url: 'https://cdn-icons.flaticon.com/png/128/4140/premium/4140048.png?token=exp=1650293666~hmac=6797f6e21cfedb726d8210b6d37216f9')

first_chatroom = Chatroom.first
first_chatroom.chatroom_memberships.create(user: first_user)
first_chatroom.chatroom_memberships.create(user: second_user)
first_user.messages.create(content: 'What is your favorite song?', chatroom: first_chatroom)
second_user.messages.create(content: 'White ferrari ', chatroom: first_chatroom)
first_user.messages.create(content: 'Oooh that is a good one', chatroom: first_chatroom)

second_chatroom = Chatroom.second
second_chatroom.chatroom_memberships.create(user: first_user)
first_user.messages.create(content: 'Who do you think is going to win NBA MVP?', chatroom: second_chatroom)
first_user.messages.create(content: 'probably Giannis', chatroom: second_chatroom)
first_user.messages.create(content: 'u right', chatroom: second_chatroom)


third_chatroom = Chatroom.third
third_chatroom.chatroom_memberships.create(user: second_user)
second_user.messages.create(content: 'are you going to coachella this year?', chatroom: third_chatroom)
second_user.messages.create(content: 'nah I didnt get tickets', chatroom: third_chatroom)
second_user.messages.create(content: 'same', chatroom: third_chatroom)
puts 'Seeding Complete'