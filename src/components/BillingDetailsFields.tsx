import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField
        name="name"
        label="Name"
        type="text"
        placeholder="Cute Buddy"
        required
      />
      <FormField
        name="email"
        label="Email"
        type="email"
        placeholder="hello@cutebuddy.com"
        required
      />
      <FormField
        name="address"
        label="Address"
        type="text"
        placeholder="185 Berry St. Suite 550"
        required
      />
      <FormField
        name="city"
        label="City"
        type="text"
        placeholder="San Francisco"
        required
      />
      <FormField
        name="state"
        label="State"
        type="text"
        placeholder="California"
        required
      />
      <FormField
        name="zip"
        label="ZIP"
        type="text"
        placeholder="94103"
      />
      <FormField
        name="country"
        label="Country"
        type="text"
        placeholder="USA"
        required
      />
    </>
  );
};

export default BillingDetailsFields;
