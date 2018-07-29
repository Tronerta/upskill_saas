class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  belongs_to :plan

  attr_accessor :stripe_card_token
  # If Pro user passes validations than call Stripe and tell to set up a subscription
  # upon charging the customers card.
  # Stripe response back with customer's data
  # Store customer.id as a customer token
  def save_with_subscription
    if valid?
      customer = Stripe::Customer.create(description: email, plan: plan_id, card: stripe_card_token)
      self.stripe_customer_token = customer.id
      save!
    end
  end
end
