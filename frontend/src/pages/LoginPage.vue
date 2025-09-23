<template>
  <div class="bg-gradient-to-t from-green-100 to-green-200 h-screen pt-20">
    <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 class="text-2xl font-bold mb-4 text-center">Connexion</h2>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label for="email" class="block mb-1 font-medium">Email</label>
          <input
            v-model="email"
            id="email"
            type="text"
            placeholder="mail@kresus.eu"
            class="w-full p-2 border rounded"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <div>
          <label for="password" class="block mb-1 font-medium"
            >Mot de passe</label
          >
          <input
            v-model="password"
            id="password"
            type="password"
            placeholder="*****"
            class="w-full p-2 border rounded"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <button
          type="submit"
          class="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { useAuth } from "../composables/auth/useAuth";

export default defineComponent({
  name: "LoginPage",
  setup() {
    const { login } = useAuth();
    const email = ref("");
    const password = ref("");

    const errors = reactive<{ email?: string; password?: string }>({});

    const validate = () => {
      errors.email = !email.value
        ? "Email requis"
        : !/\S+@\S+\.\S+/.test(email.value)
          ? "Email invalide"
          : "";

      errors.password = !password.value ? "Mot de passe requis" : "";

      return !errors.email && !errors.password;
    };

    const handleLogin = async () => {
      if (!validate()) return;
      await login({ email: email.value, password: password.value });
    };

    return { email, password, errors, handleLogin };
  },
});
</script>
