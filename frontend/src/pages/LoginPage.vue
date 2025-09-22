<template>
    <div class="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4 text-center">Connexion</h2>

        <form @submit.prevent="handleLogin" class="space-y-4">
            <div>
                <label for="email" class="block mb-1 font-medium">Email</label>
                <input v-model="email" id="email" type="email" placeholder="toto@kresus.eu"
                    class="w-full p-2 border rounded" />
            </div>

            <div>
                <label for="password" class="block mb-1 font-medium">Mot de passe</label>
                <input v-model="password" id="password" type="password" placeholder="test"
                    class="w-full p-2 border rounded" />
            </div>

            <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition">
                Se connecter
            </button>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'LoginPage',
    setup() {
        const email = ref('');
        const password = ref('');
        const router = useRouter();

        const handleLogin = () => {

            localStorage.setItem('token', 'mock-jwt-token');
            router.push({ name: 'Todos' });

        };

        return { email, password, handleLogin };
    },
});
</script>