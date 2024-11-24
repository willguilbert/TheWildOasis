import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useSettings } from './useSettings'
import { useUpdateSetting } from './useUpdateSettings'

function UpdateSettingsForm() {
  const {
    isLoading,
    error,
    settings: {
      minimumBookingLenght,
      breakfastPrice,
      maxGuestsPerBooking,
      maxBookingLenght,
    } = {},
  } = useSettings()
  const { isUpdating, updateSetting } = useUpdateSetting()
  function handleUpdate(e, field) {
    if (!e) return
    updateSetting({ [field]: e })
  }
  if (isLoading) return <Spinner />
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          defaultValue={minimumBookingLenght}
          onBlur={(e) => handleUpdate(e.target.value, 'minimumBookingLenght')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLenght}
          onBlur={(e) => handleUpdate(e.target.value, 'maxBookingLenght')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e.target.value, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          onBlur={(e) => handleUpdate(e.target.value, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  )
}

export default UpdateSettingsForm
