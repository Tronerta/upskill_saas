class Contact < ActiveRecord::Base
  validates :name, prescence: true
  validates :email, prescence: true
  validates :comments, prescence: true
end