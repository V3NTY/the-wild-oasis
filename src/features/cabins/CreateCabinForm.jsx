import { useForm } from "react-hook-form";

import FormRow from "../../ui/FormRow";
import Input, { PercentageInput } from "../../ui/Input";
import { InputCheckbox } from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useCreateCabin } from "./useCreateCabins";
import { useEditCabins } from "./useEditCabins";
import { useState } from "react";

function CreateCabinForm({ cabinToEdit = {}, setShowForm, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId); // konwersja wartości do true/false, jeśli wartość występuje = true, jeśli nie = false
  const [percentage, setPercentage] = useState(false);
  const { register, handleSubmit, reset, getValues, formState, setValue } =
    useForm({
      defaultValues: isEditSession ? editValues : {},
    });

  const { errors } = formState;
  const { isEditing, editCabin } = useEditCabins();
  const { isCreating, createCabin } = useCreateCabin();
  const isWorking = isCreating || isEditing;
  //
  // const fullAmount = getValues().regularPrice;
  // const discountPercentage = getValues().discountPercentage;

  function calcDiscountAmount(regularPrice, discountPercentage) {
    const discountAmount = (discountPercentage / 100) * regularPrice;
    if (discountAmount < regularPrice) {
      setValue("discount", Math.ceil(discountAmount));
    }
  }

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    setShowForm((show) => !show);
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? "modal" : "regular"}
    >
      <FormRow label="Cabin Name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Price should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
        multiChildren={true}
      >
        <Input
          type="number"
          disabled={percentage}
          id="discount"
          placeholder="Discount amount"
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value < Number(getValues().regularPrice) ||
              "Discount should be less than regular price",
          })}
        />
        <InputCheckbox
          type="checkbox"
          id="percentage"
          onChange={() => setPercentage((value) => !value)}
        />
        {percentage && (
          <PercentageInput
            type="number"
            placeholder="%"
            disabled={isWorking}
            id="discountPercentage"
            onChange={(e) => {
              calcDiscountAmount(getValues().regularPrice, e.target.value);
            }}
          />
        )}
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Image" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
