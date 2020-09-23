package org.viqueen.devbox.services;

import com.github.javafaker.Faker;
import org.springframework.stereotype.Component;

import java.security.SecureRandom;
import java.util.Locale;

@Component
public class FakerService {

    private final SecureRandom random;

    public FakerService() {
        random = new SecureRandom();
    }

    public Faker getInstance() {
        return LOCALES[random.nextInt(50) % 23];
    }

    private static final Faker[] LOCALES = new Faker[]{
            Faker.instance(Locale.CANADA),
            Faker.instance(Locale.CANADA_FRENCH),
            Faker.instance(Locale.CHINA),
            Faker.instance(Locale.forLanguageTag("da-DK")),
            Faker.instance(Locale.forLanguageTag("de-AT")),
            Faker.instance(Locale.forLanguageTag("de-CH")),
            Faker.instance(Locale.ENGLISH),
            Faker.instance(Locale.forLanguageTag("es")),
            Faker.instance(Locale.forLanguageTag("es-MX")),
            Faker.instance(Locale.forLanguageTag("fi-FI")),
            Faker.instance(Locale.FRANCE),
            Faker.instance(Locale.GERMANY),
            Faker.instance(Locale.ITALY),
            Faker.instance(Locale.JAPANESE),
            Faker.instance(Locale.KOREA),
            Faker.instance(Locale.forLanguageTag("nb-NO")),
            Faker.instance(Locale.forLanguageTag("nl")),
            Faker.instance(Locale.forLanguageTag("pl")),
            Faker.instance(Locale.forLanguageTag("pt")),
            Faker.instance(Locale.forLanguageTag("ru")),
            Faker.instance(Locale.forLanguageTag("sk")),
            Faker.instance(Locale.forLanguageTag("sv-SE")),
            Faker.instance(Locale.TAIWAN),
            Faker.instance(Locale.UK)
    };
}
